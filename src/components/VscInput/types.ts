type TInputTypes = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

export interface VscInputProps {
  type: TInputTypes;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}
