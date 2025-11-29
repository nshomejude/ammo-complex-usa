-- Add variations column to products table
ALTER TABLE public.products
ADD COLUMN variations JSONB DEFAULT '[]'::jsonb;

-- Update the products table comment
COMMENT ON COLUMN public.products.variations IS 'Array of product variations with name, price_modifier, and description. Example: [{"name": "20 Rounds", "price_modifier": 0, "description": "Box of 20"}, {"name": "50 Rounds", "price_modifier": 10, "description": "Box of 50"}]';

-- Add order items view for easier querying
CREATE OR REPLACE VIEW public.order_details AS
SELECT 
  o.id as order_id,
  o.order_number,
  o.status,
  o.total_amount,
  o.created_at,
  o.updated_at,
  o.user_id,
  o.shipping_address,
  o.payment_method,
  o.payment_address,
  oi.id as item_id,
  oi.product_id,
  oi.product_name,
  oi.product_type,
  oi.quantity,
  oi.price,
  oi.variation
FROM public.orders o
LEFT JOIN public.order_items oi ON o.id = oi.order_id;

-- Grant access to the view
GRANT SELECT ON public.order_details TO authenticated;
GRANT SELECT ON public.order_details TO anon;