var express = require('express');
var routes = express.Router();

var spCtrl = require('../controller/sanpham.controller');

routes.get('/danhsach', spCtrl.listSP);

routes.get('/add-sp', spCtrl.themSP);
routes.post('/add-sp', spCtrl.themSP);

routes.get('/sua-sp/:idsp', spCtrl.updateSP);
routes.post('/sua-sp/:idsp', spCtrl.updateSP);

routes.get('/delete-sp/:idsp', spCtrl.deleteSP);
routes.post('/delete-sp/:idsp', spCtrl.deleteSP);

routes.all('/capNhat-tt/:idsp', spCtrl.capNhatTT);

module.exports = routes;