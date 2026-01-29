# Guia para Obter Imagens Reais dos Locais

## Opções para Obter Imagens

### 1. Unsplash (Recomendado - Gratuito)
- Acesse: https://unsplash.com
- Busque termos específicos como:
  - "Pratagy Acqua Park Maceió"
  - "Praia do Francês Maceió"
  - "Areia Vermelha João Pessoa"
  - "Parque Arruda Câmara João Pessoa"
  - "Piscinas do Seixas João Pessoa"
  - "Praia de Tambaú João Pessoa"
  - "Pajuçara Maceió"
  - "Maceió beach"
  - "João Pessoa beach"

**Como usar:**
1. Encontre a imagem desejada
2. Clique em "Download" ou copie a URL
3. Use a URL diretamente ou baixe e coloque em `public/images/`

### 2. Google Images (Verificar Licença)
- Acesse: https://images.google.com
- Busque o local específico
- Use "Ferramentas" → "Direitos de uso" → "Reutilização permitida"
- Clique com botão direito → "Copiar endereço da imagem"

### 3. APIs de Imagens

#### Unsplash API (Gratuito com registro)
```bash
# Registrar em https://unsplash.com/developers
# Obter Access Key
```

#### Pexels API (Gratuito)
```bash
# Registrar em https://www.pexels.com/api/
# Obter API Key
```

### 4. Bancos de Imagens Gratuitos
- **Pexels**: https://www.pexels.com
- **Pixabay**: https://pixabay.com
- **FreeImages**: https://www.freeimages.com

## Sugestões de URLs Unsplash por Local

### Maceió
- **Pajuçara**: `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800`
- **Pratagy Acqua Park**: `https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800`
- **Praia do Francês**: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800`

### João Pessoa
- **Praia de Tambaú**: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800`
- **Areia Vermelha**: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800`
- **Parque Arruda Câmara**: `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800`
- **Piscinas do Seixas**: `https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800`

### Restaurantes
- **Divina Gula**: Buscar "restaurant Maceió" ou "seafood restaurant"
- **Massagueirinha**: Buscar "beach restaurant Brazil"
- **Nau Frutos do Mar**: Buscar "seafood restaurant modern"
- **Camarão Grill**: Buscar "seafood restaurant"
- **Mangai**: Buscar "Brazilian buffet restaurant"

## Como Atualizar as Imagens no Código

1. Abra `composables/useTrips.ts`
2. Localize o campo `image` de cada dia/local
3. Substitua a URL atual pela nova URL
4. Ou coloque a imagem em `public/images/` e use: `/images/nome-da-imagem.jpg`

## Exemplo de Atualização

```typescript
{
  date: '2025-02-11',
  dayOfWeek: 'Quarta',
  title: 'Pratagy Acqua Park (Dia 1)',
  city: 'Maceió',
  image: 'https://images.unsplash.com/photo-[NOVO-ID]?w=800', // Substituir aqui
  // ...
}
```

## Usando Imagens Locais

1. Coloque as imagens em `public/images/`
2. Use o caminho relativo: `/images/pratagy.jpg`
3. Exemplo:
```typescript
image: '/images/pratagy.jpg'
```
