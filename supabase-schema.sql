-- Nexora SalonOS - Shop Owner PWA - Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- DANGER ZONE: INTELLIGENT CLEANUP
-- ==========================================
-- This block uses an anonymous DO block to check if the relations exist
-- and drops them using the correct command (DROP VIEW or DROP TABLE)
-- dynamically to avoid type mismatch errors.

DO $$ 
DECLARE
    rel_record RECORD;
BEGIN
    FOR rel_record IN 
        SELECT relname, relkind 
        FROM pg_class 
        JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
        WHERE nspname = 'public' 
        AND relname IN ('gallery', 'transactions', 'reviews', 'bookings', 'services', 'staff', 'customers', 'shops', 'profiles')
    LOOP
        IF rel_record.relkind = 'v' THEN
            EXECUTE 'DROP VIEW IF EXISTS ' || quote_ident(rel_record.relname) || ' CASCADE;';
        ELSIF rel_record.relkind = 'r' THEN
            EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(rel_record.relname) || ' CASCADE;';
        END IF;
    END LOOP;
END $$;


-- ==========================================
-- 1. PROFILES / USERS TABLE
-- ==========================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'shop_owner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 2. SHOPS TABLE
-- ==========================================
CREATE TABLE shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    cover_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    pin_code VARCHAR(20),
    status VARCHAR(50) DEFAULT 'offline',
    wallet_balance NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 3. CUSTOMERS TABLE
-- ==========================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    avatar_url TEXT,
    status VARCHAR(50) DEFAULT 'Regular',
    total_visits INTEGER DEFAULT 0,
    total_spent NUMERIC(10, 2) DEFAULT 0.00,
    last_visit TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 4. STAFF TABLE
-- ==========================================
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    rating NUMERIC(3, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 5. SERVICES TABLE
-- ==========================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 6. BOOKINGS / APPOINTMENTS TABLE
-- ==========================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
    booking_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    amount NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 7. REVIEWS TABLE
-- ==========================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    reply TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 8. WALLET TRANSACTIONS TABLE
-- ==========================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    reference VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- 9. GALLERY TABLE
-- ==========================================
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- ==========================================
-- RLS (ROW LEVEL SECURITY) POLICIES
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles access" ON profiles FOR ALL USING (true);
CREATE POLICY "Public shops access" ON shops FOR ALL USING (true);
CREATE POLICY "Public customers access" ON customers FOR ALL USING (true);
CREATE POLICY "Public staff access" ON staff FOR ALL USING (true);
CREATE POLICY "Public services access" ON services FOR ALL USING (true);
CREATE POLICY "Public bookings access" ON bookings FOR ALL USING (true);
CREATE POLICY "Public reviews access" ON reviews FOR ALL USING (true);
CREATE POLICY "Public transactions access" ON transactions FOR ALL USING (true);
CREATE POLICY "Public gallery access" ON gallery FOR ALL USING (true);

-- Insert a Mock Shop and Profile so you have starting data
INSERT INTO profiles (id, email, full_name, role) 
VALUES ('11111111-1111-1111-1111-111111111111', 'owner@royalglow.com', 'Rajesh', 'shop_owner');

INSERT INTO shops (id, owner_id, name, description, city, status, wallet_balance)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Royal Glow Salon', 'Premium beauty salon', 'Mumbai', 'active', 18750.00);

-- Insert Mock Service
INSERT INTO services (shop_id, name, category, duration, price, is_active)
VALUES ('22222222-2222-2222-2222-222222222222', 'Bridal Makeup', 'Makeup', 120, 4500.00, true);

-- Insert Mock Customer
INSERT INTO customers (id, shop_id, name, phone, status, total_visits)
VALUES ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Anita Sharma', '+91 9876543210', 'VIP', 12);