from django.shortcuts import render, redirect
from .models import Product, CartItem, Order, OrderItem
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def product_list(request):
    products = Product.objects.all()
    return render(request, 'store/products.html', {'products': products})


def add_to_cart(request, product_id):
    if not request.user.is_authenticated:
        return redirect('login')

    product = Product.objects.get(id=product_id)

    cart_item, created = CartItem.objects.get_or_create(
        user=request.user,
        product=product
    )

    if not created:
        cart_item.quantity += 1

    cart_item.save()

    return redirect('cart')


def product_detail(request, product_id):
    product = Product.objects.get(id=product_id)
    return render(request, 'store/product_detail.html', {'product': product})


def cart_view(request):
    if not request.user.is_authenticated:
        return redirect('login')

    cart_items = CartItem.objects.filter(user=request.user)

    total = 0

    for item in cart_items:
        total += item.product.price * item.quantity

    return render(request, 'store/cart.html', {
        'cart_items': cart_items,
        'total': total
    })


def increase_quantity(request, item_id):
    if not request.user.is_authenticated:
        return redirect('login')

    item = CartItem.objects.get(
        id=item_id,
        user=request.user
    )

    item.quantity += 1
    item.save()

    return redirect('cart')


def decrease_quantity(request, item_id):
    if not request.user.is_authenticated:
        return redirect('login')

    item = CartItem.objects.get(
        id=item_id,
        user=request.user
    )

    if item.quantity > 1:
        item.quantity -= 1
        item.save()
    else:
        item.delete()

    return redirect('cart')


def remove_from_cart(request, item_id):
    if not request.user.is_authenticated:
        return redirect('login')

    item = CartItem.objects.get(
        id=item_id,
        user=request.user
    )

    item.delete()

    return redirect('cart')


def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():
            return render(request, 'store/register.html', {
                'error': 'Username already exists'
            })

        user = User.objects.create_user(
            username=username,
            password=password
        )

        login(request, user)

        return redirect('product_list')

    return render(request, 'store/register.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect('product_list')

        return render(request, 'store/login.html', {
            'error': 'Invalid username or password'
        })

    return render(request, 'store/login.html')


def logout_view(request):
    logout(request)
    return redirect('product_list')


def checkout(request):
    if not request.user.is_authenticated:
        return redirect('login')

    cart_items = CartItem.objects.filter(user=request.user)

    if not cart_items.exists():
        return redirect('cart')

    total = 0

    for item in cart_items:
        total += item.product.price * item.quantity

    order = Order.objects.create(
        user=request.user,
        total_amount=total
    )

    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()

    return render(request, 'store/order_success.html', {
        'order': order
    })