import style from './TextCard.module.scss';

function TextCard({ children }) {
  return (
    <div className={ style.text_card }>
      {children}
    </div>
  )
}

export default TextCard;
