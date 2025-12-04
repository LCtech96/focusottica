-- Schema per Database Neon - Focus Ottica
-- Database: purple-thunder-58179640

-- Tabella prodotti (occhiali)
CREATE TABLE IF NOT EXISTS "products" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "brand" text NOT NULL,
  "description" text,
  "image_url" text NOT NULL,
  "price" decimal(10,2),
  "category" text DEFAULT 'sunglasses',
  "in_stock" boolean DEFAULT true,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Abilita RLS (Row Level Security)
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;

-- Crea indice per ricerche più veloci
CREATE INDEX IF NOT EXISTS "brand_idx" ON "products" USING btree ("brand");
CREATE INDEX IF NOT EXISTS "category_idx" ON "products" USING btree ("category");

-- Policy per permettere a tutti di leggere i prodotti (pubblico)
CREATE POLICY "public_read_policy" ON "products" 
  AS PERMISSIVE FOR SELECT 
  TO public 
  USING (true);

-- Policy per autenticati che possono inserire/aggiornare (admin)
CREATE POLICY "authenticated_write_policy" ON "products" 
  AS PERMISSIVE FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "authenticated_update_policy" ON "products" 
  AS PERMISSIVE FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "authenticated_delete_policy" ON "products" 
  AS PERMISSIVE FOR DELETE 
  TO authenticated 
  USING (true);

-- Permessi base
GRANT SELECT ON "products" TO public, anonymous;
GRANT SELECT, INSERT, UPDATE, DELETE ON "products" TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated, anonymous;

-- Inserisci dati di esempio (Collezione Gucci)
INSERT INTO "products" ("name", "brand", "description", "image_url", "price", "category") VALUES
  ('Occhiali Esagonali', 'GUCCI', 'Montatura oro con lenti sfumate marrone', '/products/gucci-1.jpg', 450.00, 'sunglasses'),
  ('Occhiali Rettangolari', 'GUCCI', 'Montatura oro con lenti marroni', '/products/gucci-2.jpg', 420.00, 'sunglasses'),
  ('Occhiali con Dettagli', 'GUCCI', 'Montatura oro con lenti viola chiaro', '/products/gucci-3.jpg', 480.00, 'sunglasses'),
  ('Occhiali Gatto Rosa', 'GUCCI', 'Montatura trasparente rosa con lenti specchiate', '/products/gucci-4.jpg', 460.00, 'sunglasses'),
  ('Occhiali Shield', 'GUCCI', 'Montatura argentata con lenti grigie', '/products/gucci-5.jpg', 490.00, 'sunglasses'),
  ('Occhiali Cat-Eye Neri', 'GUCCI', 'Montatura nera con aste verdi marmorizzate', '/products/gucci-6.jpg', 440.00, 'sunglasses'),
  ('Occhiali Quadrati', 'GUCCI', 'Montatura nera con lenti ambra', '/products/gucci-7.jpg', 430.00, 'sunglasses'),
  ('Occhiali Aviator', 'GUCCI', 'Montatura oro con aste tartaruga', '/products/gucci-8.jpg', 470.00, 'sunglasses'),
  ('Occhiali Bianchi', 'GUCCI', 'Montatura bianca marmorizzata con lenti marroni', '/products/gucci-9.jpg', 450.00, 'sunglasses')
ON CONFLICT DO NOTHING;

