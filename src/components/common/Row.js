import style from './Row.module.scss';

function Row({ children }) {
  return (
    <div className={ style.row }>
      {children}
    </div>
  )
}

export default Row;
