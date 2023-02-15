import { NextConnectApiRequest } from './interfaces';
import { NextApiResponse } from 'next';
import { ResponseData } from './types';
import City from 'backend/models/City';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';

const CityController = {
    putCity: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id, name, province}} = req
    
        await dbConnect()
        const cityForm = {name, province:province._id}
        const newCity = await City.findByIdAndUpdate(_id, cityForm, {
            new: true,
            runValidators: true,
          }
        )
        if(!newCity) return res.json({statusCode:500, error:'could not update city'})
        const city = formatIds(newCity)
        res.json({data:{city, message:'updated city succesfully'}})
    },
    postCity: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{name, province}} = req    
        await dbConnect()
        const cityForm = {name, province:province._id}
        try {
            const newCity = await City.create(cityForm)
            if(!newCity) return res.json({statusCode:500, error:'could not create city'})
            const city = formatIds(newCity)
            return res.json({data:{city, message:'created city succesfully'}})
        } catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not create city'})
        }
    
    },
    deleteCity: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id}} = req
        //console.log(_id);
        
        await dbConnect()
        const deletedCity = await City.findById(_id)
        if(!deletedCity) return res.json({statusCode:500, error:'could not delete city'})
        await deletedCity.softDelete()
        //const City = formatIds(newCity)
        res.json({data:{message:'deleted city succesfully'}})
    }
}

export default CityController
