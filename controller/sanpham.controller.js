var fs = require('fs');
var myMD = require('../model/sanpham.model');

exports.listSP = async (req, res, next) => {

    var listSp = await myMD.spModel.find();
    console.log(listSp);

    res.render('sanpham/danhsach', {listSp: listSp});
}

exports.themSP = async (req, res, next) => {

    let msg = '';
    if(req.method == "POST"){
        //tạo đối tượng
        let objSP = new myMD.spModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.soLuong = req.body.soLuong;
        objSP.trangThai = req.body.trangThai;
        console.log(objSP);

        let img = req.files.fileanh;
        console.log(img);
        let pathImg = "";
        dataImg = "";
        file_ext = "";
        imgBase64 = "";

        pathImg = img.data;
        dataImg = pathImg.toString('base64');
        file_ext = img.name.substring(img.name.lastIndexOf('.') + 1);
        imgBase64 = `data:image/${file_ext};base64,${dataImg}`;
        objSP.img = imgBase64;

        // ghi vào csdl
        try {
            let new_SP = await objSP.save();
            console.log(new_SP);
            msg="Thêm thành công";
            return res.redirect('/sp/danhsach');
        } catch (error) {
            msg = "Lỗi" + error.message;
            console.log(error);
        }
    }

    var listSp = await myMD.spModel.find();

    res.render('sanpham/add-sp' ,{msg:msg, listSp: listSp});
}

exports.updateSP = async (req, res, next) => {

    let msg = '';
    let idsp = req.params.idsp;

    try {
        var objSP = await myMD.spModel.findById(idsp);
    } catch (error) {
        msg = "Error" + error.message;
    }
    if(req.method == "POST"){
        //tạo đối tượng
        let objSP = new myMD.spModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.soLuong = req.body.soLuong;
        objSP.trangThai = req.body.trangThai;
        objSP._id = idsp;
        console.log(objSP);

        let img = req.files.fileanh;
        console.log(img);
        let pathImg = "";
        dataImg = "";
        file_ext = "";
        imgBase64 = "";

        pathImg = img.data;
        dataImg = pathImg.toString('base64');
        file_ext = img.name.substring(img.name.lastIndexOf('.') + 1);
        imgBase64 = `data:image/${file_ext};base64,${dataImg}`;
        objSP.img = imgBase64;

        // ghi vào csdl
        try {
            await myMD.spModel.findByIdAndUpdate({_id: idsp}, objSP);
            msg="Sửa thành công";
            return res.redirect('/sp/danhsach');
        } catch (error) {
            msg = "Lỗi" + error.message;
            console.log(error);
        }
    }

    var listSp = await myMD.spModel.find();

    res.render('sanpham/sua-sp' ,{msg:msg, listSp: listSp, objSP});
}

exports.capNhatTT = async (req, res, next) => {

    let msg = '';
    let idsp = req.params.idsp;

    try {
        var objSP = await myMD.spModel.findById(idsp);
    } catch (error) {
        msg = "Error" + error.message;
    }
    if(req.method == "POST"){
        //tạo đối tượng
        let objSP = new myMD.spModel();
        objSP.trangThai = req.body.trangThai;
        objSP._id = idsp;
        console.log(objSP);

        // ghi vào csdl
        try {
            await myMD.spModel.findByIdAndUpdate({_id: idsp}, objSP);
            msg="Sửa thành công";
            return res.redirect('/sp/danhsach');
        } catch (error) {
            msg = "Lỗi" + error.message;
            console.log(error);
        }
    }

    var listSp = await myMD.spModel.find();

    res.render('sanpham/capNhat-tt' ,{msg:msg, listSp: listSp, objSP});
}

exports.deleteSP = async (req, res, next) => {

    let msg = '';
    let idsp = req.params.idsp;

    try {
        const spham = await myMD.spModel.findByIdAndDelete({_id: idsp}, req.body);
        if (!spham) {
            msg = "Xóa không thành công";
        }else{
            msg = "Xóa thành công";
            return res.redirect('/sp/danhsach');
        }
    } catch (error) {
        msg = "Lỗi" + error.message;
        console.log(error);
    }
    res.render('sanpham/delete-sp', {msg: msg});
}
