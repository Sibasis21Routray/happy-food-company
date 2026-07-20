-- =============================================
-- Database Setup
-- =============================================

-- Use the application database
USE HFC;

-- Set timezone (UTC)
SET time_zone = '+00:00';

-- =============================================
-- Verify database is ready
-- =============================================

SELECT 'Database ready!' AS status;

SELECT DATABASE() AS current_database;

SHOW TABLES;