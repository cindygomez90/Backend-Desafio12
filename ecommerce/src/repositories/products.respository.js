
class ProductRepository {
    constructor (productDao) {
        this.dao = productDao
    }

    /*getProducts = async (objConfig) => {
            const limit = parseInt(objConfig.limit)
            const page = parseInt(objConfig.page)
            const sort = parseInt(objConfig.sort) || 1
            const result = await this.dao.get({ limit, page, category: objConfig.category, sort })
            return result
    }*/
    

    getProducts = async (objConfig = {}) => {
        const limit = parseInt(objConfig.limit) || 10;
        const page = parseInt(objConfig.page) || 1;
        const sort = parseInt(objConfig.sort) || 1;
        const category = objConfig.category || '';

        const result = await this.dao.get({ limit, page, category, sort });
        return result;
    }

    /*getProducts    = async () => await this.dao.get()  */

    getProduct     = async (pid) => await this.dao.getBy(pid)

    createProduct  = async (productNew) => await this.dao.create(productNew)

    updateProduct  = async (pid, productToUpdate) => await this.dao.update(pid, productToUpdate)

    deleteProduct  = async (pid) => await this.dao.delete(pid)
}

module.exports = ProductRepository