export default function MenuCard({ item, onAdd }) {
  return (
    <div className={item.available ? 'menu-card' : 'menu-card unavailable'}>
      <div className="menu-card-top">
        <span className="menu-emoji">{item.emoji}</span>
        {item.isSpecial && <span className="tag tag-special">⭐ Special</span>}
        {!item.available && <span className="tag tag-soldout">Sold out</span>}
      </div>

      <div className="menu-card-body">
        <div className="menu-card-title">
          <h3>{item.name}</h3>
          <span className="price">${item.price.toFixed(2)}</span>
        </div>
        <p className="muted">{item.description}</p>
        <p className="ingredients">
          <strong>Ingredients:</strong> {item.ingredients.join(', ')}
        </p>
        <div className="tags">
          {item.dietary.map((tag) => (
            <span key={tag} className={'tag tag-' + tag}>{tag}</span>
          ))}
        </div>
      </div>

      <button className="btn btn-full" disabled={!item.available} onClick={() => onAdd(item)}>
        {item.available ? '+ Add to cart' : 'Sold out'}
      </button>
    </div>
  );
}