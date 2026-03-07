-- CreateTable
CREATE TABLE `auto_responders` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `device_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `ai_provider` VARCHAR(191) NULL,
    `ai_model` VARCHAR(191) NULL,
    `system_prompt` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `auto_responders_device_id_key`(`device_id`),
    INDEX `auto_responders_user_id_idx`(`user_id`),
    INDEX `auto_responders_device_id_idx`(`device_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auto_responder_rules` (
    `id` VARCHAR(191) NOT NULL,
    `auto_responder_id` VARCHAR(191) NOT NULL,
    `keywords` TEXT NOT NULL,
    `match_type` VARCHAR(191) NOT NULL DEFAULT 'CONTAINS',
    `response` TEXT NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `auto_responder_rules_auto_responder_id_idx`(`auto_responder_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auto_responders` ADD CONSTRAINT `auto_responders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auto_responders` ADD CONSTRAINT `auto_responders_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auto_responder_rules` ADD CONSTRAINT `auto_responder_rules_auto_responder_id_fkey` FOREIGN KEY (`auto_responder_id`) REFERENCES `auto_responders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
