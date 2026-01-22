# Sweet Images

This directory contains images for Indian Sweets application.

## Current Images:
### Traditional Indian Sweets
- `Ariselu.png` - Traditional Andhra sweet
- `Bobbatlu (Puran Poli).png` - Maharashtrian flatbread sweet
- `Chhena Gaja.png` - Odisha cottage cheese sweet
- `Chhena Poda.png` - Baked cottage cheese sweet
- `Keri no Ras (Mango Pulp Dessert).png` - Mango dessert
- `Ledikeni.png` - Bengali sweet
- `Mysore Pak.png` - Karnataka gram flour sweet
- `Payasam (Kheer).png` - Rice pudding
- `Rava Kesari.png` - Semolina sweet
- `Sandesh.png` - Bengali cottage cheese sweet
- `balushahi.png` - Flaky layered sweet
- `berfi.png` - Milk fudge sweet
- `gajer ka halwa.png` - Carrot halwa
- `gulab.png` - Gulab Jamun
- `imerti.png` - Orange flower-shaped sweet
- `jalebi.png` - Spiral crispy sweet
- `modak.png` - Dumpling sweet
- `rasgulla.png` - Spongy cottage cheese balls
- `rasmalai.png` - Creamy cottage cheese dessert
- `sonpari.png` - Golden sweet

### Other Images
- `gitbox.png` - Gift box for homepage
- `default-sweet.jpg` - Default fallback image

## How to Add Your Images:

1. **Replace** placeholder files with your actual sweet images
2. **Keep** same filenames to ensure application works correctly
3. **Recommended image size**: 800x600 pixels or similar aspect ratio
4. **Format**: JPG or PNG

## Automatic Image Selection:

The application automatically selects images based on sweet names:
- "ariselu" → Ariselu.png
- "bobbatlu" or "puran poli" → Bobbatlu (Puran Poli).png
- "chhena gaja" → Chhena Gaja.png
- "chhena poda" → Chhena Poda.png
- "keri" or "mango" → Keri no Ras (Mango Pulp Dessert).png
- "ledikeni" → Ledikeni.png
- "mysore pak" → Mysore Pak.png
- "payasam" or "kheer" → Payasam (Kheer).png
- "rava kesari" → Rava Kesari.png
- "sandesh" → Sandesh.png
- "balushahi" → balushahi.png
- "barfi" or "burfi" → berfi.png
- "gajar" or "halwa" → gajer ka halwa.png
- "gulab" or "jamun" → gulab.png
- "imarti" or "imerti" → imerti.png
- "jalebi" or "jilebi" → jalebi.png
- "modak" → modak.png
- "rasgulla" or "rasagola" → rasgulla.png
- "rasmalai" or "ras malai" → rasmalai.png
- "sonpari" → sonpari.png
- All other sweets → default-sweet.jpg

## Adding New Sweet Images:

To add images for new sweet types:
1. Add image file to this directory
2. Update `utils/defaultImages.ts` to include the new sweet type
3. The application will automatically use the new image
