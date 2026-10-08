def require_master_admin(user):
    if not getattr(user, 'is_authenticated', False) or getattr(user, 'role', None) != 'admin':
        raise PermissionError('Master Admin access required')
