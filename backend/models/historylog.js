const mongoose = require('mongoose')

const historylogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    historylogText: {
        type: String,
        maxLength: [500, 'Status cannot exceed 100 characters']
    },
    historylogDate: {
        type: String,
    },
    historylogType: {
        type: String,
        enum: {
            values: ['Approve', 'Decline', 'Create', 'Update', 'Delete', 'Return', 'Activate', 'Deactivate', 'Accept'],
            message: 'There is error on proccessing this input'
        }
    },
    deliveryStatus:{
        type: String,
        default: 'Delivered',
        enum: {
            values: ['Delivered', 'Seen'],
            message: 'There is error on proccessing this input'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Historylog', historylogSchema);