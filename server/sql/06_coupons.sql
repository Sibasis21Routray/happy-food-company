-- =============================================
-- Coupons Table
-- Run after 05_orders.sql
-- =============================================

USE happy_food;

-- =============================================
-- Coupons Table
-- =============================================
CREATE TABLE IF NOT EXISTS coupons (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount DECIMAL(5,2) NOT NULL,
    type ENUM('PERCENTAGE', 'FIXED') DEFAULT 'PERCENTAGE',
    min_amount DECIMAL(10,2),
    max_discount DECIMAL(10,2),
    expires_at DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    usage_limit INT,
    used_count INT DEFAULT 0,
    user_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_code (code),
    INDEX idx_active_expiry (is_active, expires_at),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Update Trigger
-- =============================================
DELIMITER //
CREATE TRIGGER before_coupon_update 
BEFORE UPDATE ON coupons 
FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//
DELIMITER ;

-- =============================================
-- Verify table created
-- =============================================
SELECT 'Coupons table created successfully!' AS status;
DESCRIBE coupons;