from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
class MasterAdminDashboardView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        if getattr(request.user,'role',None)!='admin': return Response({'detail':'Forbidden'},status=403)
        from accounts.models import User
        from restaurants.models import Restaurant
        from orders.models import Order
        return Response({'customers':User.objects.filter(role='customer').count(),'restaurants':Restaurant.objects.count(),'approved_restaurants':Restaurant.objects.filter(owner__is_approved=True).count(),'delivery_boys':User.objects.filter(role='delivery').count(),'approved_delivery_boys':User.objects.filter(role='delivery',is_approved=True).count(),'orders':Order.objects.count(),'active_orders':Order.objects.exclude(status__in=['DELIVERED','CANCELLED']).count()})
class AdminOrderControlView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        if getattr(request.user,'role',None)!='admin': return Response({'detail':'Forbidden'},status=403)
        from orders.models import Order
        return Response([{'id':o.id,'status':o.status,'total':str(o.total_amount)} for o in Order.objects.all().order_by('-id')[:200]])
