import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import ToDo from "./list";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";

const UserInfo = () => {
  const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase

  const [user, setUser] = useState(null);
  const [inputUser, setInputUser] = useState("");
  const HandleinputChange = ({ target }) => {
    setInputUser(target.value);
  };

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
      console.error("Error al cerrar sesión:", error);
    }
  };

  const HandleSubmit = async () => {
    setButtonEdit(!ButtonEdit);
    console.log(inputUser);
    if (inputUser != "") {
      updateProfile(auth.currentUser, {
        displayName: inputUser,
      });
    } else {
      updateProfile(auth.currentUser, {
        displayName: "The User Is Empty",
      });
    }
  };

  const [ButtonEdit, setButtonEdit] = useState(false);

  const BackgroundStyle = {
    backgroundColor: "#000000",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23154901' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%2332B108'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={BackgroundStyle}>
      {user ? (
        <div id="Box">
          <div>
            {ButtonEdit ? (
              <form
                onSubmit={HandleSubmit}

              >
                <Stack
                  direction="horizontal"
                  gap={1}
                  style={{top:"10%",
                  position:"relative",
                  width:"45vh",
                  marginBottom:"12.5vh"
                }}
                  id="InputContainer"
                >
                  <InputGroup
                    className="mb-3"
                    id="InputUser"
                    value={inputUser}
                    onChange={HandleinputChange}
                    data-bs-theme="dark"
                  >
                    <Form.Control
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <button
                      type="button"
                      id="button-addon1"
                      class="btn btn-outline-secondary"
                      onClick={HandleSubmit}
                    >
                      Edit
                    </button>
                  </InputGroup>
                </Stack>
              </form>
            ) : (
              <div
                id="InputContainer"
                style={{top:"10%",
                position:"relative",
                marginBottom:"15vh"
              }}
              >
                <InputGroup
                  className="mb-3"
                  data-bs-theme="dark"
                  onClick={() => {
                    setButtonEdit(!ButtonEdit);
                  }}
                >
                  <InputGroup.Text id="basic-addon1" >User</InputGroup.Text>
                  <Form.Control
                    placeholder={user.displayName}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
            )}
          </div>

          <Button
            variant="outline-danger"
            onClick={handleSignOut}
            style={{top:"80%",
                  right:"10%",
            position:"fixed",
          }}
          >
            LogOut
          </Button>

          <ToDo></ToDo>
        </div>
      ) : (
        <p id="ErrorLogin">Please Log in</p>
      )}
    </div>
  );
};

export default UserInfo;
