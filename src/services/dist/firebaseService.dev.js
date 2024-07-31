"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subirPDFaFirebase = exports.updateDatosIniciales = exports.getDatosIniciales = exports.saveData = exports.logout = exports.login = exports.register = void 0;

var _firebaseConfig = require("../utils/firebaseConfig");

var _firestore = require("firebase/firestore");

var _auth = require("firebase/auth");

var _storage = require("firebase/storage");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Función para registrar usuarios
var register = function register(email, password) {
  return (0, _auth.createUserWithEmailAndPassword)(_firebaseConfig.auth, email, password);
}; // Función para iniciar sesión


exports.register = register;

var login = function login(email, password) {
  return (0, _auth.signInWithEmailAndPassword)(_firebaseConfig.auth, email, password);
}; // Función para cerrar sesión


exports.login = login;

var logout = function logout() {
  return (0, _auth.signOut)(_firebaseConfig.auth);
};
/**
 * Función para guardar datos en Firestore, incluyendo el UID del usuario.
 * @param {string} collectionName - El nombre de la colección.
 * @param {Object} data - Los datos a guardar.
 * @returns {Promise<void>}
 */


exports.logout = logout;

var saveData = function saveData(collectionName, data) {
  var user, dataWithUID;
  return regeneratorRuntime.async(function saveData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = _firebaseConfig.auth.currentUser;

          if (user) {
            _context.next = 3;
            break;
          }

          throw new Error('No hay usuario logueado');

        case 3:
          // Añadir el UID del usuario a los datos
          dataWithUID = _objectSpread({}, data, {
            uid: user.uid
          });
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _firestore.addDoc)((0, _firestore.collection)(_firebaseConfig.db, collectionName), dataWithUID));

        case 7:
          console.log('Datos guardados exitosamente');
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          console.error('Error guardando datos:', _context.t0);
          throw new Error('Error al guardar los datos');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
};
/**
 * Función para obtener datos iniciales del usuario logueado.
 * @returns {Promise<Object>} - Los datos iniciales del usuario.
 */


exports.saveData = saveData;

var getDatosIniciales = function getDatosIniciales() {
  var user, q, querySnapshot;
  return regeneratorRuntime.async(function getDatosIniciales$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = _firebaseConfig.auth.currentUser;

          if (user) {
            _context2.next = 3;
            break;
          }

          throw new Error('No hay usuario logueado');

        case 3:
          q = (0, _firestore.query)((0, _firestore.collection)(_firebaseConfig.db, 'datosIniciales'), (0, _firestore.where)('uid', '==', user.uid));
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

        case 6:
          querySnapshot = _context2.sent;

          if (!querySnapshot.empty) {
            _context2.next = 9;
            break;
          }

          throw new Error('No se encontraron datos iniciales');

        case 9:
          return _context2.abrupt("return", querySnapshot.docs[0].data());

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**
 * Función para actualizar datos iniciales en Firestore.
 * @param {Object} data - Los datos a actualizar.
 * @returns {Promise<void>}
 */


exports.getDatosIniciales = getDatosIniciales;

var updateDatosIniciales = function updateDatosIniciales(data) {
  var user, q, querySnapshot, docRef;
  return regeneratorRuntime.async(function updateDatosIniciales$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = _firebaseConfig.auth.currentUser;

          if (user) {
            _context3.next = 3;
            break;
          }

          throw new Error('No hay usuario logueado');

        case 3:
          q = (0, _firestore.query)((0, _firestore.collection)(_firebaseConfig.db, 'datosIniciales'), (0, _firestore.where)('uid', '==', user.uid));
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

        case 6:
          querySnapshot = _context3.sent;

          if (!querySnapshot.empty) {
            _context3.next = 9;
            break;
          }

          throw new Error('No se encontraron datos iniciales para actualizar');

        case 9:
          docRef = querySnapshot.docs[0].ref;
          _context3.next = 12;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(docRef, data));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/**
 * Función para subir el PDF a Firebase Storage
 * @param {Blob} pdfBlob - El Blob del archivo PDF
 * @param {string} storagePath - La ruta en Firebase Storage
 * @returns {Promise<void>}
 */


exports.updateDatosIniciales = updateDatosIniciales;

var subirPDFaFirebase = function subirPDFaFirebase(pdfBlob, storagePath) {
  var storage, storageRef;
  return regeneratorRuntime.async(function subirPDFaFirebase$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          storage = (0, _storage.getStorage)();
          storageRef = (0, _storage.ref)(storage, storagePath);
          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _storage.uploadBytes)(storageRef, pdfBlob));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.subirPDFaFirebase = subirPDFaFirebase;