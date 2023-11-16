const { Transportation, Type, sequelize } = require("../models");
// const cloudinary = require("cloudinary");
// const { Op } = sequelize;

class Controller {
  static async createRentCar(req, res, next) {
    try {
      const { name, description, imgUrl, location, price, typeId } = req.body;
      const authorId = req.user.id
    //   console.log(req.user, "<<<")

      let transportation = await Transportation.create({
        name,
        description,
        imgUrl,
        location,
        price,
        typeId,
        authorId
      });

      res.status(201).json(transportation);
    } catch (error) {
        next(error)
    }   
  }

  static async showRentCar(req,res,next){
    try {
        let {filter, sort, page, limit} = req.query;
        page = +page || 1;
        limit = limit || 20;

        let paramsQuery = {
            limit : limit,
            offset : (page -1) * limit,
            where :{}
        }

        //filter
        const typeId = filter?.typeId;
        const name = filter?.name;

        if (typeId){
            paramsQuery.where.typeId = typeId
        }

        if (name){
            paramsQuery.where.typeId = typeId
        }

        //sort
        if (sort){
            paramsQuery.order = [['name', sort]];
        } else if (sort){
            paramsQuery.order = [['typeId', sort]]
        }

        let transportation = await Transportation.findAndCountAll(paramsQuery);
        res.status(200).json(transportation)
    } catch (error) {
        next(error)
    }
  }

  static async showRentCarById(req,res,next){
    try {
        const {id} = req.params
        const data = await Transportation.findByPk(id);
        if(!data){
            throw {name : "Not Found", id}
        }
        res.status(200).json({data})
    } catch (error) {
        next(error)
    }
  }

  static async updateRentCar(req,res,next){
    try {
        const {id} = req.params
        const {name, description, imgUrl, location, price, typeId} = req.body
        const oldRentCar = await Transportation.findByPk(id);
        if(!oldRentCar){
            throw {name : "NotFound", id}
        }

        const data = await Transportation.update(req.body,{
            where : {
                id : `${id}`
            }
        })

        const updateRentCar = await Transportation.findByPk(id)
        res.status(200).json({updateRentCar})
    } catch (error) {
        next(error)
    }
  }

  static async deleteRentCar(req,res,next){
    try {
        const {id} = req.params
        if(!id){
            throw {name : "NotFoundId", id}
        }
        const deleteTransportation = await Transportation.findByPk(id)
        await Transportation.destroy({
            where : {
                id : id
            }
        })
        if(!deleteTransportation){
            throw {name : "NotFound", id}
        }

        res.status(200).json({ message : `Id with ${id} success delete`})
    } catch (error) {
        next(error)
    }
  }

  static async createSupport(req,res,next){
    try {
        const {name} = req.body

        let type = await Type.create({name})

        res.status(201).json({type})
    } catch (error) {
        next(error)
    }
  }

  static async showType(req,res,next){
    try {
        let type = await Type.findAll()

        res.status(200).json({type})
    } catch (error) {
        next(error)
    }
  }

  static async updateType(req,res,next){
    try {
        const {id} = req.params
        const oldType = await Type.findByPk(id)

        if(!oldType){
            throw{name : "NotFound", id}
        }

        let data = await Type.update(req.body, {
            where : {
                id : id
            }
        })
        
        res.status(200).json({data, message : `id ${id} success updated`})
    } catch (error) {
        next(error)
    }
  }

  static async deleteType(req,res,next){
    try {
        const {id} = req.params
        const oldType = await Type.findByPk(id)
        if(!oldType){
            throw {name : "NotFound", id}
        }
        await Type.destroy({
            where : {
                id : id
            }
        })
        res.status(200).json({message : `Id With ${id} successfully deleted `})
    } catch (error) {
        next(error)
    }
  }

  static async rentTransportation(req,res,next){
    try {
        
    } catch (error) {
        next(error)
    }
  }
}


module.exports = Controller