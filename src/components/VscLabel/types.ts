export interface VscLabelProps {
  /** Идентификатор элемента, к которому привязывается label. */
  id: string;
  /** Текст для отображения. */
  labelText: string;
  /** Элемент является обязательным для заполнения. */
  required?: boolean;
  /** Обозначение элемента, оябзательного для заполнения. */
  requiredMark?: string;
}
