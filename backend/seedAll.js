const bcrypt = require("bcrypt");
const db = require("./models/index"); 
const { User, Service, Schedule, Notification, sequelize } = db;

const seedDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Baza je povezana...");
    const userCount = await User.count();
        if (userCount > 0) {
          console.log("ℹ️ Podaci već postoje u bazi, preskačem seed.");
          return; 
        }
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash("lozinka123", saltRounds);

    const sminker = await User.create({
      name: "Endi Endic",
      email: "endi@salon.com",
      password: hashedPass,
      role: "makeup_artist"
    });

    const klijent = await User.create({
        name: "Meli Melic",
        email: "meli@klijent.com",
        password: hashedPass,
        role: "client"
    });

    const admin = await User.create({
        name: "Ilidza Ilidzic",
        email: "ilidza@admin.com",
        password: hashedPass,
        role: "ADMIN"
    });

    const usluge = await Service.bulkCreate([
        { name: "Classic Glow Facial", description: "Dubinski tretman čišćenja lica koji vraća koži prirodni sjaj.", price: 4200.00, duration: 60 },
        { name: "Trajni Lak (Gel Polish)", description: "Besprekoran manikir koji traje i do tri nedelje.", price: 2000.00, duration: 60 },
        { name: "Relaks Masaža Zen", description: "Opuštajuća masaža celog tela toplim aromatičnim uljima.", price: 3500.00, duration: 60 },
        { name: "Lash Lift", description: "Prirodno uvijanje i jačanje vaših trepavica.", price: 2500.00, duration: 60 },
        { name: "Maderoterapija Lica", description: "Prirodna tehnika masaže drvenim elementima.", price: 3000.00, duration: 60 },
        { name: "SPA Pedikir", description: "Kompletna nega stopala uz piling i masažu.", price: 2200.00, duration: 60 },
        { name: "Dnevna Šminka", description: "Lagana i sveža šminka za svaki dan.", price: 3000.00, duration: 60 },
        { name: "Večernja Šminka", description: "Intenzivan izgled prilagođen svečanostima.", price: 4500.00, duration: 60 },
        { name: "Bridal Make-up", description: "Specijalizovana šminka za venčanja.", price: 7000.00, duration: 60 }
    ]);

    const dates = [];
    for (let i = 0; i < 7; i++) { 
      let d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }

    const radnoVreme = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "14:00:00", "15:00:00", "16:00:00"];
    
    const rasporedi = [];
    dates.forEach(date => {
    radnoVreme.forEach(time => {
        
        let [hours, minutes, seconds] = time.split(':').map(Number);
        
        let dateObj = new Date();
        dateObj.setHours(hours, minutes, 0);
        dateObj.setMinutes(dateObj.getMinutes() + 60); 

        let endTime = dateObj.toTimeString().split(' ')[0]; 

        rasporedi.push({
            makeupArtistId: sminker.id,
            date: date,
            startTime: time, 
            endTime: endTime,  
            isAvailable: true
        });
    });
    });

    await Schedule.bulkCreate(rasporedi);

    await Notification.bulkCreate([
      {
        userId: sminker.id,
        type: "WELCOME",
        message: "Dobrodošli nazad! Danas imate 0 zakazanih termina."
      },
      {
        userId: klijent.id,
        type: "INFO",
        message: "Dobrodošli na naš sistem za rezervacije! Pogledajte nove cene usluga."
      }
    ]);

    console.log("-----------------------------------------");
    console.log("🚀 SVE JE SPREMNO!");
    console.log(`✅ Korisnici, Usluge, Rasporedi i Notifikacije su u bazi.`);
    console.log("-----------------------------------------");

  } catch (error) {
    console.error("❌ Greška pri punjenju baze:", error);
  }
};

module.exports = seedDatabase;