-- Add foreign key constraint to link reviews to profiles
ALTER TABLE public.reviews
ADD CONSTRAINT fk_reviews_user_id
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;