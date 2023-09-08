import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const UserInfo = () => {
  const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Crea un listener para detectar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // El usuario está autenticado
        setUser(firebaseUser); // Almacena los datos del usuario en el estado
      } else {
        // El usuario no está autenticado, puedes hacer algo en consecuencia
        setUser(null);
      }
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Usuario: {user.displayName}</p>
          <p>Correo electrónico: {user.email}</p>
          <p>UID: {user.uid}</p>
          {/* Puedes acceder a otros datos del usuario según tu configuración */}
          <button onClick={handleSignOut}>Cerrar Sesión</button>
        </div>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </div>
  );
};

export default UserInfo;
