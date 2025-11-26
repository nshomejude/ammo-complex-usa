import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";
import { ShoppingCart, CreditCard, Package, CheckCircle } from "lucide-react";
import { getStoredShippingConfig } from "@/hooks/useShippingConfig";

interface PaymentAddress {
  id: string;
  payment_type: 'bitcoin' | 'usdt' | 'monero';
  address: string;
  label: string | null;
}

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [paymentAddresses, setPaymentAddresses] = useState<PaymentAddress[]>([]);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"bitcoin" | "usdt" | "monero">("bitcoin");

  useEffect(() => {
    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        toast.error("Please log in to checkout");
        navigate("/auth");
      } else {
        setUser(user);
      }
    });

    // Fetch payment addresses
    supabase
      .from("payment_addresses")
      .select("*")
      .eq("is_active", true)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching payment addresses:", error);
        } else {
          setPaymentAddresses(data || []);
        }
      });
  }, [navigate]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some items to your cart before checking out</p>
              <Button onClick={() => navigate("/products")}>Browse Products</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const shippingConfig = getStoredShippingConfig();
  const shippingCost = shippingConfig.regions.usEu[shippingMethod].cost;
  const total = cartTotal + shippingCost;

  const selectedAddress = paymentAddresses.find(addr => addr.payment_type === paymentMethod);

  const handlePlaceOrder = async () => {
    // Validate form
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.country || !shippingInfo.postalCode) {
      toast.error("Please fill in all shipping information");
      return;
    }

    if (!selectedAddress) {
      toast.error("Payment address not available. Please contact support.");
      return;
    }

    setLoading(true);

    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: total,
          status: "pending",
          shipping_address: shippingInfo,
          payment_method: paymentMethod,
          payment_address: selectedAddress.address,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        product_type: item.type,
        quantity: item.quantity,
        price: item.price,
        variation: item.variation || null,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      clearCart();

      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Package className="h-8 w-8 text-primary" />
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      placeholder="10001"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    placeholder="United States"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={(v: any) => setShippingMethod(v)}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Standard Shipping</div>
                      <div className="text-sm text-muted-foreground">
                        {shippingConfig.regions.usEu.standard.days} - Delivery
                      </div>
                    </Label>
                    <span className="font-semibold">${shippingConfig.regions.usEu.standard.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Express Shipping</div>
                      <div className="text-sm text-muted-foreground">
                        {shippingConfig.regions.usEu.express.days} - Delivery
                      </div>
                    </Label>
                    <span className="font-semibold">${shippingConfig.regions.usEu.express.cost.toFixed(2)}</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)}>
                  {paymentAddresses.some(addr => addr.payment_type === 'bitcoin') && (
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="bitcoin" id="bitcoin" />
                      <Label htmlFor="bitcoin" className="flex-1 cursor-pointer font-semibold">
                        Bitcoin (BTC)
                      </Label>
                    </div>
                  )}
                  {paymentAddresses.some(addr => addr.payment_type === 'usdt') && (
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="usdt" id="usdt" />
                      <Label htmlFor="usdt" className="flex-1 cursor-pointer font-semibold">
                        USDT (Tether)
                      </Label>
                    </div>
                  )}
                  {paymentAddresses.some(addr => addr.payment_type === 'monero') && (
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="monero" id="monero" />
                      <Label htmlFor="monero" className="flex-1 cursor-pointer font-semibold">
                        Monero (XMR)
                      </Label>
                    </div>
                  )}
                </RadioGroup>

                {selectedAddress && (
                  <div className="mt-6 p-6 bg-muted rounded-lg text-center">
                    <h4 className="font-semibold mb-4">Send payment to this address:</h4>
                    <div className="bg-background p-4 rounded-lg inline-block mb-4">
                      <QRCodeSVG value={selectedAddress.address} size={200} />
                    </div>
                    <div className="bg-background p-3 rounded-lg border">
                      <code className="text-sm break-all">{selectedAddress.address}</code>
                    </div>
                    {selectedAddress.label && (
                      <p className="text-sm text-muted-foreground mt-2">{selectedAddress.label}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.variation)}`} className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.variation && (
                          <div className="text-xs text-muted-foreground">{item.variation.value}</div>
                        )}
                        <div className="text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {loading ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
