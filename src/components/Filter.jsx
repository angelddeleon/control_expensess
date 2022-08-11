
const Filter = ({filter, setFilter}) => {
  return(
    <div className="filters shadow container">
      <form>
        <div className='field'>
          <label>Filter expenses</label>

          <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          >
            
          <option value="">--All the categorys--</option>
                <option value="savings">savings</option>
                <option value="food">food</option>
                <option value="house">house</option>
                <option value="expenses">expenses Varios</option>
                <option value="leisure">leisure</option>
                <option value="health">health</option>
                <option value="subscriptions">subscriptions</option>
          </select>

        </div>
      </form>
    </div>
  )
};

export default Filter;
