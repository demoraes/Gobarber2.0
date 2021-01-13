import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

/**
 *                          **Anotações Repositories**
 *  Repositories: Conexão entre a persistencia dos dados(banco de dados, localstorag e etc) e
 *  a nossa rota
 *
 *
 *  Obs: - Sempre que você precisar de alguma informação você ira se conectar com o repositorio
 *       - Possui a responsabilidade de criar, armazenar, ler, deletar e editar
 */

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    // se houver retorna findAppointment se não retorna null
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointments);

    return appointments;
  }
}

export default AppointmentsRepository;
