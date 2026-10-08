from decimal import Decimal
DEFAULT_MASTER_SETTINGS={'delivery_radius_km':15,'minimum_order':Decimal('100.00'),'delivery_charge':Decimal('30.00'),'commission_percent':Decimal('10.00'),'image_limit_kb':40}
def customer_safe_settings(settings): return {k:v for k,v in settings.items() if k!='delivery_radius_km'}
