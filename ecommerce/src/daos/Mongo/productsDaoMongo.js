const { productModel }  = require ('../Mongo/models/products.model.js')

class ProductDaoMongo {
    
    async get({ limit = 10, page = 1, category = '', sort = 1 }) {       
            const query = category.length !== 0 ? { category } : {}
            const options = { 
                limit, 
                skip: (page - 1) * limit, 
                sort: { price: sort } 
            }
            const result = await productModel.find(query, null, options).lean()
            const totalDocs = await productModel.countDocuments(query)
            const totalPages = Math.ceil(totalDocs / limit)

            return { docs: result, totalPages }
    }
    
    /*async get() {
        return await productModel.find({status: true})
    }*/

    async getBy (pid) {
        return await productModel.findOne ({ _id: pid })
    }

        async create (productNew) {
            return await productModel.create (productNew)
        }

    async update (pid, productToUpdate) {
        return await productModel.findOneAndUpdate({_id: pid}, productToUpdate, { new: true })
    }

    async delete (pid) {
        return await productModel.findByIdAndUpdate({_id: pid}, {status: false}, {new: true})
    }
}


module.exports = ProductDaoMongo