import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

/**
 *                          **Anotações Repositories**
 *  Repositories: Conexão entre a persistencia dos dados(banco de dados, localstorag e etc) e
 *  a nossa rota
 *
 *
 *  Obs: - Sempre que você precisar de alguma informação você ira se conectar com o repositorio
 *       - Possui a responsabilidade de criar, armazenar, ler, deletar e editar
 */

class AppointmentsRepository {
  // variavel que não é acessivel fora da classe
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    // se houver retorna findAppointment se não retorna null
    return findAppointment || null;
  }

  public create({ date, provider }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
