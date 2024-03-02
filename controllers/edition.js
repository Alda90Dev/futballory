const { response } = require('express');
const Edition = require('../models/edition');

const createEdition = async (req, res = response) => {
    try {
        const edition = new Edition(req.body);
        await edition.save();

        res.json({
            success: true,
            edition
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateEdition = async(req, res = response) => {
    const { _id, name, name_en, edition, from_date, to_date, status, host, tournament_id } = req.body;

    try {
        const updateEdition = await Edition.findById(_id);
        updateEdition.name = name;
        updateEdition.name_en = name_en;
        updateEdition.edition = edition;
        updateEdition.from_date = from_date;
        updateEdition.to_date = to_date;
        updateEdition.status = status;
        updateEdition.host = host;
        updateEdition.tournament_id = tournament_id;

        await updateEdition.save();

        res.json({
            success: true,
            updateEdition
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateImgThumb = async(req, res = response) => {
    const { _id, img_thumb } = req.body;

    try {
        const edition = await Edition.findById(_id);
        edition.img_thumb = img_thumb;

        await edition.save();

        res.json({
            success: true,
            edition
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    } 
}

const updateImgPortrait = async(req, res = response) => {
    const { _id, img_portrait } = req.body;

    try {
        const edition = await Edition.findById(_id);
        edition.img_portrait = img_portrait;

        await edition.save();

        res.json({
            success: true,
            edition
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    } 
}

const updateImgLandscape = async(req, res = response) => {
    const { _id, img_landscape } = req.body;

    try {
        const edition = await Edition.findById(_id);
        edition.img_landscape = img_landscape;

        await edition.save();

        res.json({
            success: true,
            edition
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    } 
}

const getEditions = async(req, res) => {
    const tournament_id = req.params.tournament_id;
    const editions = await Edition.find({ tournament_id: tournament_id });

    res.json({
        success: true,
        editions
    });
}

module.exports = {
    createEdition,
    updateEdition,
    updateImgThumb,
    updateImgPortrait,
    updateImgLandscape,
    getEditions
}
