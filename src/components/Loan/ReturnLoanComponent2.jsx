import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLoanById } from '../../services/LoanService'
import { getDebtByLoanId } from '../../services/DebtService'
import { returnLoan } from '../../services/LoanService'
import { useKeycloak } from '@react-keycloak/web'


const CreateLoanComponent2 = () => {
  const { id } = useParams(); // loanId de la URL
  const [loan, setLoan] = useState(null)
  const [debt, setDebt] = useState(null)

    const { keycloak } = useKeycloak();
    const rutUser = keycloak?.tokenParsed?.rut;

    const navigate = useNavigate();

const handleReturnLoan = () => {
  if (!rutUser) {
    alert("No se encontró el RUT del usuario autenticado.");
    return;
  }

  returnLoan(id, rutUser, false)
    .then(res => {
      if (res.data === true) {
        alert("✅ Devolución registrada correctamente.");
        navigate('/return-loan'); // redirigir a la lista de préstamos
      } else {
        alert("❌ No se pudo registrar la devolución.");
      }
    })
    .catch(err => {
      console.error("Error al devolver préstamo:", err);
      alert("Error en el servidor al devolver el préstamo.");
    });
};

const handleReturnLoan2 = () => {
  if (!rutUser) {
    alert("No se encontró el RUT del usuario autenticado.");
    return;
  }

  returnLoan(id, rutUser, true)
    .then(res => {
      if (res.data === true) {
        alert("✅ Devolución registrada correctamente.");
        navigate('/return-loan'); // redirigir a la lista de préstamos
      } else {
        alert("❌ No se pudo registrar la devolución.");
      }
    })
    .catch(err => {
      console.error("Error al devolver préstamo:", err);
      alert("Error en el servidor al devolver el préstamo.");
    });
};

  useEffect(() => {
    // Cargar préstamo
    getLoanById(id)
      .then(res => setLoan(res.data))
      .catch(err => console.error("Error al cargar loan:", err))

    // Cargar deuda asociada (si existe)
    getDebtByLoanId(id)
      .then(res => setDebt(res.data))
      .catch(err => {
        console.warn("No hay deuda asociada a este préstamo")
        setDebt(null)
      })
  }, [id])

  if (!loan) return <p>Cargando datos del préstamo...</p>

  return (
    <div className="container mt-3">
      <h2>Devolución de préstamo #{loan.id}</h2>

      <form>
        <div className="form-group mb-2">
          <label>Cliente</label>
          <input className="form-control" value={loan.clientRut} disabled />
        </div>

        <div className="form-group mb-2">
          <label>Herramienta</label>
          <input className="form-control" value={loan.toolName} disabled />
        </div>

        <div className="form-group mb-2">
          <label>Fecha de entrega</label>
          <input className="form-control" value={loan.deliveryDate} disabled />
        </div>

        <div className="form-group mb-2">
          <label>Fecha pactada devolución</label>
          <input className="form-control" value={loan.returnDateExpected} disabled />
        </div>

        <div className="form-group mb-2">
          <label>Multa</label>
          <input
            className="form-control"
            value={debt ? `$${debt.amount} (${debt.type})` : "0 / Sin deuda"}
            disabled
          />
        </div>

        <button
  type="button"
  className="btn btn-primary"
  onClick={handleReturnLoan}
>
  Confirmar devolución
</button>

        <button type="button" className="btn btn-warning ms-2" onClick={handleReturnLoan2}>
          Devolución con Daños
        </button>
      </form>
    </div>
  )
}

export default CreateLoanComponent2
