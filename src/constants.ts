enum UserRole {
  ROOT = 'root',
  MANAGER = 'manager',
  USER = 'user'
}

enum OrderStatus {
  WAITING = 'awaiting-confirmation',
  SUCCESS = 'fulfilled',
  CANCELED = 'cancelled'
}

export {
  UserRole,
  OrderStatus
}