const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false })

const School = conn.define('school', 
  {
    name: {
      type: Sequelize.STRING 
    },
    address: {
      type: Sequelize.STRING 
    },
    description: {
      type: Sequelize.TEXT 
    }
  }
)

const Student = conn.define('student', 
  {
    firstName: {
      type: Sequelize.STRING 
    },
    lastName: {
      type: Sequelize.STRING 
    },
    gpa: {
      type: Sequelize.INTEGER 
    }
  }
)

Student.belongsTo(School)
School.hasMany(Student)

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(async ()=> {
      await Promise.all([
        School.create({name: 'Hogwarts School of Witchcraft and Wizardry', address: 'Next to the lake, Scotland', description: `Hogwarts School of Witchcraft and Wizardry is the British wizarding school, located in the Highlands of Scotland. It takes students from the United Kingdom of Great Britain and Northern Ireland, and Ireland. The castle is located in the mountains near a loch. The precise location of the school can never be uncovered because it was rendered Unplottable. To Muggles, the school looks like an old abandoned castle. Similarly, most wizarding schools locations are protected in order to prevent their ways of teaching being revealed, as well as protect the students and schools themselves from any harm. Established around the 10th century, Hogwarts is considered to be one of the finest magical institutions in the wizarding world, though other notable schools included Beauxbatons Academy of Magic, the Durmstrang Institute, and Ilvermorny School of Witchcraft and Wizardry. Children with magical abilities are enrolled at birth, and acceptance is confirmed by owl post at age eleven. However, if the child in question is a Muggle-born, a professor from the school would come and inform the child's parents. The school's motto is Draco Dormiens Nunquam Titillandus (Draco Dormiens Nvnqvam Titillandvs), which, translated from Latin, means "Never tickle a sleeping dragon".`}),
        School.create({name: 'Beauxbatons Academy of Magic', address: 'Next to the forest, France', description: `Beauxbatons Academy of Magic (French: Académie de Magie Beauxbâtons) is the French wizarding school, located in the Pyreneesmountains of southern France. The school takes many of its students from France, as well as large numbers from Spain, Portugal, the Netherlands, Luxembourg, and Belgium. It's unknown if students from other countries are allowed. The school's coat of arms consists of two golden wands crossed over one another, each shooting three stars.`}),
        School.create({name: 'Durmstrang Institute', address: 'Next to the mountain, Germany', description: `Durmstrang Institute (Cyrillic: Дурмстранг) is the Northern wizarding school. Located in the far north of Europe the school is willing to accept international students as far as Bulgaria. Having existed since at least 1294, Durmstrang is one of the three schools that compete in the Triwizard Tournament, and is notorious for prominently featuring the Dark Arts in its curriculum.`}),
        School.create({name: 'Mahoutokoro School of Magic', address: 'Next to the river, Japan', description: `Mahoutokoro (Japanese: 魔法所, Mahōtokoro) is the Japanese wizarding school, located on the topmost point of the volcanic island of Minami Iwo Jima. It has the smallest student body of the eleven major wizarding schools.`}),
        School.create({name: 'Ilvermorny', address: 'Next to the coastline, United States', description: `Ilvermorny School of Witchcraft and Wizardry is the American wizarding school, located on Mount Greylock in modern-day Massachusetts. It accepts students from all over North America. Students of this school, as at Hogwarts in Scotland, are sorted into four houses.`})
      ])
      await Promise.all([
        Student.create({firstName: 'Harry', lastName: 'Potter', gpa: 3.6, schoolId: 1}),
        Student.create({firstName: 'Ron', lastName: 'Weasley', gpa: 3.2, schoolId: 1}),
        Student.create({firstName: 'Hermione', lastName: 'Granger', gpa: 4.0, schoolId: 1}),
        Student.create({firstName: 'Fleur', lastName: 'Delacour', gpa: 4.0, schoolId: 2}),
        Student.create({firstName: 'Nicolas', lastName: 'Flamel', gpa: 3.8, schoolId: 2}),
        Student.create({firstName: 'Olympe', lastName: 'Maxime', gpa: 3.4, schoolId: 2}),
        Student.create({firstName: 'Viktor', lastName: 'Krum', gpa: 3.4, schoolId: 3}),
        Student.create({firstName: 'Gellert', lastName: 'Grindelwald', gpa: 4.0, schoolId: 3}),
        Student.create({firstName: 'Igor', lastName: 'Karkaroff', gpa: 2.9, schoolId: 3}),
        Student.create({firstName: 'Kayumi', lastName: 'Kojiro', gpa: 4.0, schoolId: 4}),
        Student.create({firstName: 'Urayama', lastName: 'Masaaki', gpa: 3.4, schoolId: 4}),
        Student.create({firstName: 'Izumi', lastName: 'Kiho', gpa: 4.0, schoolId: 4}),
        Student.create({firstName: 'Timothy', lastName: 'Vandermark', gpa: 2.8, schoolId: 5}),
        Student.create({firstName: 'Chuck', lastName: 'Berkman', gpa: 3.9, schoolId: 5}),
        Student.create({firstName: 'Ruth', lastName: 'Howland', gpa: 4.0, schoolId: 5})
      ])
    })
}

module.exports = {
  syncAndSeed,
  models: {
    School,
    Student
  }
}