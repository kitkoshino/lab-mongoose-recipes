const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Strogonoff',
      level: 'Easy Peasy',
      ingredients: ['meat', 'cream', 'tomato sauce'],
      cuisine: 'teste',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 30,
      creator: 'Someone',
      created: '05/12/2019',
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })

  .then(() => {
    Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 101 }
    );
  })

  .then(() => {
    Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then(() => {
    return mongoose.disconnect();
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
