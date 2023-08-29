const mongoose = require('mongoose')

//const mongoURI = 'mongodb+srv://sk8579076:iamSRK13@cluster0.eyjisa2.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoURI = 'mongodb://sumit1212:sumit123@ac-jkfvp7n-shard-00-00.eyjisa2.mongodb.net:27017,ac-jkfvp7n-shard-00-01.eyjisa2.mongodb.net:27017,ac-jkfvp7n-shard-00-02.eyjisa2.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-xco0vg-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.set('strictQuery', true);


const mongoDB = async () => {
    // to connect to the mongoDB database

    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err);
        else {
            console.log("connected to mongo");

            // to collect info about the food_items and foodCateory;

            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function (err, data) {
                const foodCategory = mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // global food_items & foodCategory used

                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                });

            });
        }
    })
};





module.exports = mongoDB;