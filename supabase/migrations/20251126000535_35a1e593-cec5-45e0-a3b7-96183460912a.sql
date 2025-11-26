-- Create enum for payment types
CREATE TYPE public.payment_type AS ENUM ('bitcoin', 'usdt', 'monero');

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Arms Complex',
  seo_title TEXT NOT NULL DEFAULT 'Arms Complex - Premium Firearms & Ammunition',
  meta_description TEXT NOT NULL DEFAULT 'Your trusted source for firearms, ammunition, and tactical gear',
  tags TEXT[] DEFAULT ARRAY['firearms', 'ammunition', 'tactical gear'],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payment_addresses table
CREATE TABLE public.payment_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_type payment_type NOT NULL,
  address TEXT NOT NULL,
  label TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add payment columns to orders table
ALTER TABLE public.orders 
ADD COLUMN payment_method TEXT,
ADD COLUMN payment_address TEXT;

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_addresses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_settings
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for payment_addresses
CREATE POLICY "Anyone can view active payment addresses"
  ON public.payment_addresses FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage payment addresses"
  ON public.payment_addresses FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default site settings
INSERT INTO public.site_settings (site_name, seo_title, meta_description, tags)
VALUES ('Arms Complex', 'Arms Complex - Premium Firearms & Ammunition', 'Your trusted source for firearms, ammunition, and tactical gear', ARRAY['firearms', 'ammunition', 'tactical gear']);

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payment_addresses_updated_at
  BEFORE UPDATE ON public.payment_addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();