///======   ----History Serch!!!----
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HistorySchema = new Schema({
    Historyy: {
        type: String,
        required: true
    }
}, { timestamps: true });
const History = mongoose.model('history_us', HistorySchema);
module.exports = History;