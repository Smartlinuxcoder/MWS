import { pgTable, serial, text, real, unique, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').unique(),
    mcUsername: text('mc_username').unique(),
    discordTag: text('discord_tag'),
    password: text('password'),
    balance: real('balance').default(100),
    createdAt: timestamp('created_at').defaultNow(),
    baseCoords: json('base_coords'),
    lastLogin: timestamp('last_login'),
    isActive: boolean('is_active').default(true),
    trustScore: real('trust_score').default(50), // 100 max
});

export const vault = pgTable('vaults', {
    id: serial('id').primaryKey(),
    ownerId: integer('owner_id').references(() => user.id),
    itemType: text('item_type'),
    quantity: integer('quantity'),
    storageFee: real('storage_fee'), // Per day
    lastFeeCollection: timestamp('last_fee_collection').defaultNow(),
    locationCoords: json('location_coords'), // Stash location
    createdAt: timestamp('created_at').defaultNow(),
});

export const shipping = pgTable('shipping', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id),
    itemType: text('item_type'),
    quantity: integer('quantity'),
    fromCoords: json('from_coords'),
    toCoords: json('to_coords'),
    status: text('status'), // pending, in-transit, delivered
    insuranceAmount: real('insurance_amount'),
    shippingFee: real('shipping_fee'),
    createdAt: timestamp('created_at').defaultNow(),
    estimatedDelivery: timestamp('estimated_delivery'),
    deliveredAt: timestamp('delivered_at'),
});

export const loan = pgTable('loans', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id),
    amount: real('amount'),
    interestRate: real('interest_rate'),
    collateral: json('collateral'), // Item type and quantity
    status: text('status'), // pending, active, paid, defaulted
    dueDate: timestamp('due_date'),
    createdAt: timestamp('created_at').defaultNow(),
    lastPayment: timestamp('last_payment'),
    remainingAmount: real('remaining_amount'),
});

export const transaction = pgTable('transactions', {
    id: serial('id').primaryKey(),
    senderId: integer('sender_id').references(() => user.id),
    receiverId: integer('receiver_id').references(() => user.id),
    amount: real('amount'),
    type: text('type'), // transfer, loan_payment, fee, interest
    itemType: text('item_type'), // For item-based transactions
    quantity: integer('quantity'), // For item-based transactions
    timestamp: timestamp('timestamp').defaultNow(),
    transactionHash: text('transaction_hash'),
});

export const fees = pgTable('fees', {
    id: serial('id').primaryKey(),
    type: text('fee_type').unique(), // storage, shipping, transaction, loan_origination
    baseRate: real('base_rate'),
    multiplier: real('multiplier'),
    minFee: real('min_fee'),
    maxFee: real('max_fee'),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const itemRegistry = pgTable('item_registry', {
    id: serial('id').primaryKey(),
    seller: text('seller'),
    itemName: text('item_name').unique(),
    baseValue: real('base_value'), // Base value in idk iron
    maxStorageQuantity: integer('max_storage_quantity'),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const marketPrices = pgTable('market_prices', {
    id: serial('id').primaryKey(),
    itemId: integer('item_id').references(() => itemRegistry.id),
    price: real('price'),
    timestamp: timestamp('timestamp').defaultNow(),
    trend: text('trend'), // increasing, decreasing, stable
});

export const notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id),
    type: text('type'), // loan_due, storage_fee, price_alert
    message: text('message'),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});
export const banknotes = pgTable('banknotes', {
    id: serial('id').primaryKey(),
    sender: text('sender'),
    receiver: text('receiver'),
    amount: real('amount'),
    transactionHash: text('transaction_hash'),
    timestamp: timestamp('timestamp').defaultNow(),
});