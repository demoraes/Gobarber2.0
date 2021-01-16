import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

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

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parserdDate = parseISO(date);

  // toda regra de negocio foi colocado dentro de um service no codigo logo abaixo
  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parserdDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
