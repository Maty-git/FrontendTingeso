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

  if (!loan) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando datos del préstamo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card card-custom">
            <div className="card-header-custom">
              <h2 className="h4 mb-0 text-center">
                <i className="fas fa-undo me-2"></i>
                Devolución de Préstamo #{loan.id}
              </h2>
            </div>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-user me-2"></i>
                      Cliente (RUT)
                    </label>
                    <input 
                      className="form-control form-control-custom" 
                      value={loan.clientRut} 
                      disabled 
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-tools me-2"></i>
                      Herramienta
                    </label>
                    <input 
                      className="form-control form-control-custom" 
                      value={loan.toolName} 
                      disabled 
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-calendar-check me-2"></i>
                      Fecha de Entrega
                    </label>
                    <input 
                      className="form-control form-control-custom" 
                      value={new Date(loan.deliveryDate).toLocaleString('es-CL')} 
                      disabled 
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-calendar-alt me-2"></i>
                      Fecha Pactada de Devolución
                    </label>
                    <input 
                      className="form-control form-control-custom" 
                      value={new Date(loan.returnDateExpected).toLocaleString('es-CL')} 
                      disabled 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Multa / Deuda
                  </label>
                  <div className="input-group">
                    <input
                      className={`form-control form-control-custom ${debt ? 'border-danger' : 'border-success'}`}
                      value={debt ? `$${debt.amount.toLocaleString('es-CL')} (${debt.type === 'LATE_FEE' ? 'Multa por Atraso' : debt.type === 'REPLACEMENT' ? 'Reposición' : debt.type})` : "Sin deuda"}
                      disabled
                    />
                    {debt && (
                      <span className="input-group-text bg-danger text-white">
                        <i className="fas fa-dollar-sign"></i>
                      </span>
                    )}
                    {!debt && (
                      <span className="input-group-text bg-success text-white">
                        <i className="fas fa-check"></i>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-success btn-lg px-5 me-3"
                    onClick={handleReturnLoan}
                  >
                    <i className="fas fa-check-circle me-2"></i>
                    Confirmar Devolución Normal
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-warning btn-lg px-5" 
                    onClick={handleReturnLoan2}
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    Devolución con Daños
                  </button>
                </div>

                <div className="alert alert-info mt-4" role="alert">
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>Importante:</strong> Si la herramienta presenta daños, seleccione "Devolución con Daños" para registrar la condición y aplicar cargos correspondientes.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateLoanComponent2
