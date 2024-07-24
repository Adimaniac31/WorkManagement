import sequelize from './sequelize.js'; // Adjust the path as necessary

export const sync = (async () => {
  try {
    await sequelize.sync({alter:true}); // Use { force: true } only for development
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
