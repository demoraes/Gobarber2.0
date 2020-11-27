import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

/**
 *                          **Anotações Routes**
 *
 *  Rota: A responsabilidade da rota é receber a requisição, chamar outro
 *  arquivo para que seja feita a tratativa, podendo ser um repository ou service
 *  e por fim devolver uma resposta
 *
 *  Obs: Nas rotas não pode haver trechos de codigo relacionado a regra de negocio
 *  da aplicação, isso é responsabilidade do service, somente pode haver transformação
 *  de dados, como por exemplo o parseISO na qual transforma os dados em formato
 *  de data.
 */

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parserdDate = parseISO(date);

    // toda regra de negocio foi colocado dentro de um service no codigo logo abaixo
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parserdDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
