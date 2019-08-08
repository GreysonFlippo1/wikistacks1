const Sequelize = require('sequelize');

//Default sequalize url
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

//Use this if this doesn't work
// const db = new Sequelize("postgres://postgres:postgres@localhost:1337/wikistack", {
//   logging: false,
//   dialect: 'postgres'
//   // anything else you want to pass
// })

const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull:false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull:false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull:false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  });

  Page.beforeValidate((instance) => {
    let title = instance.title;
    instance.slug = title.replace(/\s+/g, '_').replace(/\W/g, '');
  });

  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        isEmail: true,
      }
    }
  });

  module.exports = { db, Page, User };
