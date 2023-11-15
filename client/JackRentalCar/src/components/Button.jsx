import './Button.css'

export default function Button({ value, type="submit" }) {
  return (
    <>
      <div id='button'>
        <button type={type}>{value}</button>
      </div>
    </>
  )
}