var db = require('./db');

const spSchema = new db.mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: { type: String, required: true},
    soLuong: {type: Number, required: true},
    trangThai: {type: Boolean, required: true}
},
    {collection: 'SanPham'}
);

let spModel = db.mongoose.model('spModel', spSchema);

module.exports = {spModel};