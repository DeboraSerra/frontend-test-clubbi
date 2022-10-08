import style from './Loading.module.scss';

function Loading() {
  return (
    <div className={ style.back }>
      <div className={ style.spinner }>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading;
