/**
 * Script para crear el primer usuario administrador.
 * Uso: node scripts/crearAdmin.js
 */
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Usuario  = require('../models/Usuario');

const ADMIN = {
    nombre:   'Administrador',
    email:    'admin@newstyles.com',
    password: 'Admin2024!',
    rol:      'admin',
    telefono: ''
};

async function crearAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Conectado a MongoDB\n');

        const existe = await Usuario.findOne({ email: ADMIN.email });
        if (existe) {
            console.log(`⚠️  Ya existe un usuario con ese email: ${ADMIN.email}`);
            console.log(`   Rol actual: ${existe.rol}`);
            if (existe.rol !== 'admin') {
                existe.rol = 'admin';
                await existe.save();
                console.log('✅ Rol actualizado a admin correctamente.');
            }
        } else {
            const admin = new Usuario(ADMIN);
            await admin.save();
            console.log('✅ Admin creado exitosamente:');
            console.log(`   Email:    ${ADMIN.email}`);
            console.log(`   Password: ${ADMIN.password}`);
            console.log(`   Rol:      admin`);
            console.log('\n⚠️  Cambia la contraseña después del primer login.');
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

crearAdmin();
