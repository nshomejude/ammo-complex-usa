import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-16">
              <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Add some products to your cart to get started.
              </p>
              <Link to="/products">
                <Button size="lg">Browse Products</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <Card key={`${item.id}-${JSON.stringify(item.variation)}-${index}`} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      {item.variation && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.variation.type}: {item.variation.value}
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id, item.variation)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variation)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variation)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({cartCount})</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout">
                  <Button size="lg" className="w-full mb-3">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
