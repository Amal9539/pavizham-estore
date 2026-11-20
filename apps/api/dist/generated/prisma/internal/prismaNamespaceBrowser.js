import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Category: 'Category',
    Product: 'Product',
    ProductImage: 'ProductImage',
    Address: 'Address',
    Order: 'Order',
    OrderItem: 'OrderItem'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    phone: 'phone',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    sku: 'sku',
    price: 'price',
    stock: 'stock',
    isActive: 'isActive',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ProductImageScalarFieldEnum = {
    id: 'id',
    url: 'url',
    productId: 'productId',
    createdAt: 'createdAt'
};
export const AddressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    phone: 'phone',
    address: 'address',
    city: 'city',
    state: 'state',
    postalCode: 'postalCode',
    country: 'country',
    createdAt: 'createdAt'
};
export const OrderScalarFieldEnum = {
    id: 'id',
    orderNumber: 'orderNumber',
    userId: 'userId',
    status: 'status',
    totalAmount: 'totalAmount',
    shippingName: 'shippingName',
    shippingPhone: 'shippingPhone',
    shippingAddress: 'shippingAddress',
    shippingCity: 'shippingCity',
    shippingState: 'shippingState',
    shippingPostal: 'shippingPostal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map