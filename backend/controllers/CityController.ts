import { NextConnectApiRequest } from './interfaces';
import { NextApiResponse } from 'next';
import { ResponseData } from './types';
import CityModel from 'backend/models/City';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';

const CityController = {
    put: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id, name, province}} = req
    
        await dbConnect()
        const cityForm = {name, province:province._id}
        const newCity = await CityModel.findByIdAndUpdate(_id, cityForm, {
            new: true,
            runValidators: true,
          }
        )
        if(!newCity) return res.json({statusCode:500, error:'could not update city'})
        const city = formatIds(newCity)
        res.json({data:{city, message:'updated city succesfully'}})
    },
    post: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{name, province}} = req    
        await dbConnect()
        const cityForm = {name, province:province._id}
        try {
            const deletedCity = await CityModel.findOne({name})
            if(deletedCity){
                deletedCity.province = province._id
                deletedCity.restore()
                return res.json({data:{deletedCity, message:'created city succesfully'}})
            } 
            const newCity = await CityModel.create(cityForm)
            const city = formatIds(newCity)
            return res.json({data:{city, message:'created city succesfully'}})
        } catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not create city'})
        }
    
    },
    delete: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id}} = req
        //console.log(_id);
        
        await dbConnect()
        const deletedCity = await CityModel.findById(_id)
        if(!deletedCity) return res.json({statusCode:500, error:'could not delete city'})
        await deletedCity.softDelete()

        //const City = formatIds(newCity)
        res.json({data:{message:'deleted city succesfully'}})
    },
    get:async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        //console.log(_id);
        await dbConnect()
        const cities = await CityModel.findUndeleted()
        if(!cities) return res.json({statusCode:500, error:'no cities were found'})
        res.json({data:{cities:formatIds(cities), message:'cities found'}})
    },
}

export default CityController
