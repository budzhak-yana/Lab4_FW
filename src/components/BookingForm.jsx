
function BookingForm({
  name,
  setName,
  service,
  setService,
  date,
  setDate,
  time,
  setTime,
  editingId,
  addBooking,
}) {
  return (
    <section className="panel">
      <h2>
        {editingId !== null
          ? 'Редагувати запис'
          : 'Додати запис'}
      </h2>

      <form onSubmit={addBooking}>
        <input
          placeholder="Ім'я клієнта"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <select
          value={service}
          onChange={(event) => setService(event.target.value)}
        >
          <option>Ламінування вій</option>
          <option>Фарбування вій</option>
          <option>Ламінування брів</option>
          <option>Корекція брів</option>
        </select>

        <label htmlFor="booking-date">
          Дата процедури
        </label>
        <input
          id="booking-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <label htmlFor="booking-time">
          Час процедури
        </label>
        <input
          id="booking-time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />

        <button type="submit">
          {editingId !== null
            ? 'Зберегти зміни'
            : 'Додати запис'}
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
